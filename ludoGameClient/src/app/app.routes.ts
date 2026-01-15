import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LudoBoardComponent } from './ludo-board/ludo-board.component';
import { RoomConnectGenerateComponent } from './components/room-connect-generate/room-connect-generate.component';
import { NotFoundError } from 'rxjs';
import { GameSetupComponent } from './game-setup/game-setup.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path:'login',
        component: LoginComponent,
    },
    {
        path:'signup',
        component: SignupComponent,
    },
    {
        path:'ludo-board',
        component: LudoBoardComponent,
    },
    {
        path:'room-connect',
        component: RoomConnectGenerateComponent,
    },
    {
        path:'game-setup',
        component: GameSetupComponent,
    },
    {
        path:'**',
        component: NotFoundError,
    }
    
];