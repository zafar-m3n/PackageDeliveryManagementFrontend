import { Routes } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { TranslatePackageComponent } from './translate-package/translate-package.component';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';
import { GenerativeAiComponent } from './generative-ai/generative-ai.component';

export const routes: Routes = [
  { path: 'add-driver', component: AddDriverComponent },
  { path: 'add-package', component: AddPackageComponent },
  { path: 'delete-driver', component: DeleteDriverComponent },
  { path: 'delete-package', component: DeletePackageComponent },
  { path: 'list-drivers', component: ListDriversComponent },
  { path: 'list-packages', component: ListPackagesComponent },
  { path: 'update-driver', component: UpdateDriverComponent },
  { path: 'update-package', component: UpdatePackageComponent },
  { path: 'translate-package', component: TranslatePackageComponent },
  { path: 'text-to-speech', component: TextToSpeechComponent },
  { path: 'generative-ai', component: GenerativeAiComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'invalid-data', component: InvalidDataComponent },
  { path: '', redirectTo: '/add-driver', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
