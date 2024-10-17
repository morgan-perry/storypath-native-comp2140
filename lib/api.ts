const API_BASE_URL: string = "https://0b5ff8b0.uqcloud.net/api";
const JWT_TOKEN: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ4MDc5MDEifQ.6-aS_-R740FhYcv_wz6mnvjzlIt7vYVg-5sWgUTBjIk";
// Your UQ student username, used for row-level security to retrieve your records
const USERNAME: string = "s4807901";

interface RequestInit {
  method: string;
  headers: { [key: string]: string };
  body?: string;
}

export interface NewProject {
  title: string;
  description: string;
  instructions: string;
  initial_clue: string;
  homescreen_display: string;
  is_published: boolean;
  participant_scoring: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  instructions: string;
  initial_clue: string;
  homescreen_display: string;
  is_published: boolean;
  participant_scoring: string;
}

export interface NewLocation {
  project_id: number;
  location_name: string;
  location_trigger: string;
  location_position: string; // point
  location_order: number;
  location_content: string;
  extra: string;
  clue: string;
  score_points: number;
}

export interface ProjectLocation {
  id: number;
  project_id: number;
  location_name: string;
  location_trigger: string;
  location_position: string;
  location_order: number;
  username: string;
  location_content: string;
  extra: string;
  clue: string;
  score_points: number;
}

export interface Tracking {
  id: number;
  project_id: number;
  location_id: number;
  points: number;
  username: string;
  participant_username: string;
}

export interface NewTracking {
  project_id: number;
  location_id: number;
  points: number;
  participant_username: string;
}

/**
 * Helper function to handle API requests.
 * It sets the Authorization token and optionally includes the request body.
 *
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} [method='GET'] - The HTTP method to use (GET, POST, PATCH).
 * @param {object} [body=null] - The request body to send, typically for POST or PATCH.
 * @returns {Promise<object>} - The JSON response from the API.
 * @throws Will throw an error if the HTTP response is not OK.
 */
async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body:
    | Project
    | NewProject
    | Partial<Project>
    | NewLocation
    | Partial<ProjectLocation>
    | null = null,
): Promise<any> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  };

  if (method === "POST" || method === "PATCH") {
    options.headers["Prefer"] = "return=representation";
  }

  if (body) {
    options.body = JSON.stringify({ ...body, username: USERNAME });
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Function to list all projects associated with the current user.
 *
 * @returns {Promise<any[]>} - An array of project objects.
 */
export async function getProjects(): Promise<any[]> {
  return apiRequest("/project");
}

export async function getProject(id: number): Promise<Project> {
  return apiRequest(`/project?id=eq.${id}`);
}

/**
 * Function to insert a new project into the database.
 *
 * @param {Project} newProject - The project data to insert.
 * @returns {Promise<any>} - The created project object returned by the API.
 */
export async function createProject(newProject: NewProject): Promise<any> {
  return apiRequest("/project", "POST", newProject);
}

/**
 * Function to partially update an existing project by its ID.
 *
 * @param {number} id - The ID of the project to update.
 * @param {Partial<Project>} partialUpdate - The partial update data.
 * @returns {Promise<Project>} - The updated project object returned by the API.
 */
export async function updateProject(
  id: number,
  partialUpdate: Partial<Project>,
): Promise<Project> {
  const url = `/project?id=eq.${id}`;
  return apiRequest(url, "PATCH", partialUpdate);
}

export async function getLocations(): Promise<ProjectLocation[]> {
  return apiRequest("/location");
}

export async function createLocation(location: NewLocation): Promise<Location> {
  return apiRequest("/location", "POST", location);
}

export async function updateLocation(
  partialUpdate: Partial<ProjectLocation>,
  id: number,
): Promise<ProjectLocation> {
  const url = `/location?id=eq.${id}`;
  return apiRequest(url, "PATCH", partialUpdate);
}

/**
 * Function to delete a project by its ID.
 *
 * @param {string} id - The ID of the project to delete.
 * @returns {Promise<any>} - The response from the API.
 */
export async function deleteProject(id: number): Promise<any> {
  const url = `/project?id=eq.${id}`;
  try {
    const response = await apiRequest(url, "DELETE");
    if (!response || response.status === 204) {
      // No Content
      return {}; // or return a default value
    }
    if (response.ok) {
      return await response.json();
      throw new Error(`Error deleting project ${id}: ${response.statusText}`);
    } else {
    }
  } catch (error) {
    return;
  }
}

export async function getLocation(id: number): Promise<any> {
  const url = "/location?id=eq.${projectId}";
  return apiRequest(url);
}

export async function getLocationByProjectId(projectId: number) {
  return apiRequest(`/location?project_id=eq.${projectId}`);
}

export async function deleteLocation(id: number): Promise<any> {
  const url = `/location?id=eq.${id}`;
  try {
    const response = await apiRequest(url, "DELETE");
    if (!response || response.status === 204) {
      // No Content
      return {}; // or return a default value
    }
    if (response.ok) {
      return await response.json();
      throw new Error(`Error deleting project ${id}: ${response.statusText}`);
    } else {
    }
  } catch (error) {
    return;
  }
}

/**
 * Function to get all tracking records for the current user.
 *
 * @returns {Promise<Tracking[]>} - An array of tracking objects.
 */
export async function getTrackingRecords(): Promise<Tracking[]> {
  return apiRequest("/tracking");
}

/**
 * Function to get tracking records for a specific project.
 *
 * @param {number} projectId - The ID of the project to get tracking records for.
 * @returns {Promise<Tracking[]>} - An array of tracking objects for the specified project.
 */
export async function getTrackingRecordsByProject(projectId: number): Promise<Tracking[]> {
  return apiRequest(`/tracking?project_id=eq.${projectId}`);
}

/**
 * Function to create a new tracking record.
 *
 * @param {NewTracking} newTracking - The tracking data to insert.
 * @returns {Promise<Tracking>} - The created tracking object returned by the API.
 */
export async function createTrackingRecord(newTracking: Omit<NewTracking, 'participant_username'>): Promise<Tracking> {
  const participantUsername = await AsyncStorage.getItem('participantUsername');
  if (!participantUsername) {
    throw new Error('Participant username not set');
  }
  return apiRequest("/tracking", "POST", { ...newTracking, participant_username: participantUsername });
}

/**
 * Function to update an existing tracking record.
 *
 * @param {number} id - The ID of the tracking record to update.
 * @param {Partial<Tracking>} partialUpdate - The partial update data.
 * @returns {Promise<Tracking>} - The updated tracking object returned by the API.
 */
export async function updateTrackingRecord(
  id: number,
  partialUpdate: Partial<Tracking>
): Promise<Tracking> {
  const url = `/tracking?id=eq.${id}`;
  return apiRequest(url, "PATCH", partialUpdate);
}

/**
 * Function to delete a tracking record by its ID.
 *
 * @param {number} id - The ID of the tracking record to delete.
 * @returns {Promise<any>} - The response from the API.
 */
export async function deleteTrackingRecord(id: number): Promise<any> {
  const url = `/tracking?id=eq.${id}`;
  try {
    const response = await apiRequest(url, "DELETE");
    if (!response || response.status === 204) {
      // No Content
      return {}; // or return a default value
    }
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Error deleting tracking record ${id}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return;
  }
}
