const DATA_URL = '/data/organizationData.json';
const SIMULATED_NETWORK_DELAY = 250;

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const createMapById = (items) => new Map(items.map((item) => [item.id, item]));

const hydrateClient = (client, engineersById) => ({
  ...client,
  managerIds: client.managerIds.filter(Boolean),
  engineeringTeam: client.engineeringTeamIds
    .map((engineerId) => engineersById.get(engineerId)?.name)
    .filter(Boolean),
});

const hydrateManager = (manager, engineersById, clientsById) => {
  const managerProfile = engineersById.get(manager.engineerId);

  return {
    ...managerProfile,
    id: manager.id,
    legacyId: manager.legacyId,
    engineerId: manager.engineerId,
    employees: manager.employeeIds
      .map((engineerId) => engineersById.get(engineerId))
      .filter(Boolean),
    clients: manager.clientIds
      .map((clientId) => clientsById.get(clientId))
      .filter(Boolean),
  };
};

export const hydrateOrganizationData = (data) => {
  const engineersById = createMapById(data.engineers);
  const hydratedClients = data.clients.map((client) => hydrateClient(client, engineersById));
  const clientsById = createMapById(hydratedClients);

  return {
    director: data.director,
    managers: data.managers.map((manager) => hydrateManager(manager, engineersById, clientsById)),
  };
};

export async function fetchOrganizationData() {
  const [response] = await Promise.all([fetch(DATA_URL), wait(SIMULATED_NETWORK_DELAY)]);

  if (!response.ok) {
    throw new Error(`Unable to load organization data (${response.status})`);
  }

  const data = await response.json();

  return hydrateOrganizationData(data);
}
