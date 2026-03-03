import { Routes } from "@angular/router";
import { VideoSearch } from "./components/video-search/video-search";

export const HEAL_WELL_ROUTES: Routes = [
  {
    path: '',
    component: VideoSearch
  },
  {
    path: 'videos',
    component: VideoSearch
  }
];
