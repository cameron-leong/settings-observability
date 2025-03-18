import { problemsClient } from '@dynatrace-sdk/client-classic-environment-v2';
import { ProblemResponse } from 'src/types/problemResponse';

export async function fetchHostCpuProblems() {
  try {
    const data = await problemsClient.getProblems({
        problemSelector: "text(CPU saturation)"
      });
    return data as ProblemResponse;  // Ensure the data is returned
  } catch (error) {
    console.error("Error fetching host anomaly detection data:", error);
    return null; // Handle failure
  }
}
