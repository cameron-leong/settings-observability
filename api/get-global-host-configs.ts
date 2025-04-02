import { settingsObjectsClient } from '@dynatrace-sdk/client-classic-environment-v2';
import { AnomalyDetectionResponse } from '../src/types/anomalyDetectionTypes'

export async function getGlobalHostConfigs() {
  try {
    const data = await settingsObjectsClient.getEffectiveSettingsValues({
      schemaIds: 'builtin:anomaly-detection.infrastructure-hosts',
      scope: 'ENVIRONMENT'
    });
    return data as AnomalyDetectionResponse;  // Ensure the data is returned
  } catch (error) {
    console.error("Error fetching host anomaly detection data:", error);
    return null; // Handle failure
  }
}
