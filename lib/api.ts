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
