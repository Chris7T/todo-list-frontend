import { environment } from '../environments/environment';

export const API_CONFIG = {
  userLoginUrl: `${environment.apiBaseUrl}/api/user/login`,
  userRegisterUrl: `${environment.apiBaseUrl}/api/user/register`,
  
  googleAuthUrl: `${environment.apiBaseUrl}/api/google/auth`,
  googleAuthCallbackUrl: `${environment.apiBaseUrl}/api/google/callback`,
  
  taskRegisterUrl: `${environment.apiBaseUrl}/api/task/register`,
  taskUpdateUrl: `${environment.apiBaseUrl}/api/task/update`,
  taskListUrl: `${environment.apiBaseUrl}/api/task/list`,
  taskGoogleImportUrl: `${environment.apiBaseUrl}/api/task/google/import`,
  taskGoogleExportUrl: `${environment.apiBaseUrl}/api/task/google/export`,
  taskGetUrl: `${environment.apiBaseUrl}/api/task/get`,
  taskDeleteUrl: `${environment.apiBaseUrl}/api/task/delete`,
  taskCompleteUrl: `${environment.apiBaseUrl}/api/task/complete`,
  
  taskListListUrl: `${environment.apiBaseUrl}/api/task-list/list`,
  taskListRegisterUrl: `${environment.apiBaseUrl}/api/task-list/register`,
  taskListDeleteUrl: `${environment.apiBaseUrl}/api/task-list/delete`,
  taskListUpdateUrl: `${environment.apiBaseUrl}/api/task-list/update`,
};