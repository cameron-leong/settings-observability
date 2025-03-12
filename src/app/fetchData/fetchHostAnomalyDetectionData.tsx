import { settingsObjectsClient } from '@dynatrace-sdk/client-classic-environment-v2';
import { HostAnomalyDetectionResponse } from 'src/types/anomalyDetectionTypes';

export async function fetchHostAnomalyDetectionData() {
  try {
    const data = await settingsObjectsClient.getEffectiveSettingsValues({
      schemaIds: 'builtin:anomaly-detection.infrastructure-hosts',
      scope: 'ENVIRONMENT'
    });
    return data as HostAnomalyDetectionResponse;  // Ensure the data is returned
  } catch (error) {
    console.error("Error fetching host anomaly detection data:", error);
    return null; // Handle failure
  }
}
