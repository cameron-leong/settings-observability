export interface Detection {
    enabled: boolean;
    detectionMode: string;
    customThresholds?: {
      gcTimePercentage?: number;
      gcSuspensionPercentage?: number;
      eventThresholds?: {
        violatingSamples: number;
        violatingEvaluationWindow: number;
        dealertingSamples: number;
        dealertingEvaluationWindow: number;
      };
      outOfMemoryExceptionsNumber?: number;
      outOfThreadsExceptionsNumber?: number;
      newConnectionFailuresPercentage?: number;
      failedConnectionsNumberPerMinute?: number;
    };
  }
  
  export interface Host {
    connectionLostDetection: Detection;
    highCpuSaturationDetection: Detection;
    highSystemLoadDetection: Detection;
    highMemoryDetection: Detection;
    highGcActivityDetection: Detection;
    outOfMemoryDetection: Detection;
    outOfThreadsDetection: Detection;
  }
  
  export interface Network {
    networkDroppedPacketsDetection: Detection;
    networkErrorsDetection: Detection;
    highNetworkDetection: Detection;
    networkTcpProblemsDetection: Detection;
    networkHighRetransmissionDetection: Detection;
  }
  
  export interface Value {
    host: Host;
    network: Network;
  }
  
  export interface Item {
    origin: string;
    value: Value;
  }
  
  export interface HostAnomalyDetectionResponse {
    items: Item[];
    totalCount: number;
    pageSize: number;
  }
  