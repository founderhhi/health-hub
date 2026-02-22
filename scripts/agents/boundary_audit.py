#!/usr/bin/env python3
"""Boundary audit for agent write scopes."""

from __future__ import annotations

import argparse
import json
import subprocess
from dataclasses import dataclass
from datetime import datetime, timezone
from fnmatch import fnmatch
from pathlib import Path
from typing import Dict, List


@dataclass
class Agent:
    agent_id: str
    name: str
    globs: List[str]


def run(command: List[str]) -> str:
    completed = subprocess.run(command, capture_output=True, text=True, check=True)
    return completed.stdout


def parse_changed_files() -> List[str]:
    output = run(["git", "status", "--porcelain"])
    files: List[str] = []

    for raw_line in output.splitlines():
        line = raw_line.rstrip()
        if not line:
            continue

        path_part = line[3:]
        if " -> " in path_part:
            path_part = path_part.split(" -> ", 1)[1]

        candidate = Path(path_part)
        if path_part.endswith("/") or candidate.is_dir():
            for nested in candidate.rglob("*"):
                if nested.is_file():
                    nested_path = nested.as_posix()
                    if nested_path.endswith(".DS_Store"):
                        continue
                    files.append(nested_path)
            continue

        if path_part.endswith(".DS_Store"):
            continue

        files.append(path_part)

    return sorted(set(files))


def load_agents(config_path: Path) -> List[Agent]:
    payload = json.loads(config_path.read_text(encoding="utf-8"))
    agents = []
    for item in payload["agents"]:
        agents.append(
            Agent(
                agent_id=item["id"],
                name=item["name"],
                globs=item["allowedWriteGlobs"],
            )
        )
    return agents


def owners_for_file(path: str, agents: List[Agent]) -> List[Agent]:
    owners: List[Agent] = []
    for agent in agents:
        for pattern in agent.globs:
            if fnmatch(path, pattern):
                owners.append(agent)
                break
    return owners


def build_report(
    changed_files: List[str],
    ownership: Dict[str, List[Agent]],
    violations: List[str],
) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    lines = [
        "# Boundary Audit Report",
        "",
        f"Generated: {now}",
        "",
    ]

    if not changed_files:
        lines.extend(["No changed files detected.", ""])
    else:
        lines.extend(
            [
                "## Changed Files and Owning Agent",
                "",
                "| File | Owner(s) |",
                "|---|---|",
            ]
        )

        for path in changed_files:
            owners = ownership[path]
            owner_label = (
                ", ".join(f"{agent.agent_id} ({agent.name})" for agent in owners)
                if owners
                else "NONE"
            )
            lines.append(f"| `{path}` | {owner_label} |")
        lines.append("")

    if violations:
        lines.extend(
            [
                "## Result",
                "",
                "FAIL",
                "",
                "## Violations",
                "",
            ]
        )
        lines.extend(f"- {item}" for item in violations)
        lines.append("")
    else:
        lines.extend(
            [
                "## Result",
                "",
                "PASS",
                "",
            ]
        )

    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Audit changed files against agent boundaries"
    )
    parser.add_argument(
        "--config",
        default="docs/audit/agents/agent-boundaries.json",
        help="Path to boundary JSON config",
    )
    parser.add_argument(
        "--report",
        default="docs/audit/agents/reports/latest-boundary-audit.md",
        help="Output markdown report path",
    )
    args = parser.parse_args()

    config_path = Path(args.config)
    report_path = Path(args.report)

    agents = load_agents(config_path)
    changed_files = parse_changed_files()

    ownership: Dict[str, List[Agent]] = {}
    violations: List[str] = []

    for path in changed_files:
        owners = owners_for_file(path, agents)
        ownership[path] = owners
        if len(owners) == 0:
            violations.append(f"`{path}` has no owning agent")
        elif len(owners) > 1:
            labels = ", ".join(agent.agent_id for agent in owners)
            violations.append(f"`{path}` has multiple owning agents: {labels}")

    report = build_report(changed_files, ownership, violations)
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(report, encoding="utf-8")

    print(report_path)
    return 1 if violations else 0


if __name__ == "__main__":
    raise SystemExit(main())
