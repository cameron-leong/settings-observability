export interface EventThresholds {
    violatingSamples: number;
    violatingEvaluationWindow: number;
    dealertingSamples: number;
    dealertingEvaluationWindow: number;
  }
  
  export interface CustomThresholdsCPU {
    cpuSaturation: number;
    eventThresholds: EventThresholds;
  }
  
  export interface CustomThresholdsMemory {
    usedMemoryPercentageWindows: number;
    usedMemoryPercentageNonWindows: number;
    pageFaultsPerSecondWindows: number;
    pageFaultsPerSecondNonWindows: number;
    eventThresholds: EventThresholds;
  }
  export interface CustomThresholdsGC {
    gcTimePercentage: number;
    gcSuspensionPercentage: number;
  }
  
  export interface CustomThresholdsGeneral {
    outOfMemoryExceptionsNumber?: number;
    outOfThreadsExceptionsNumber?: number;
    eventThresholds: EventThresholds;
  }
  
  export interface DetectionSetting<T = undefined> {
    enabled: boolean;
    detectionMode?: 'auto' | 'custom';
    customThresholds?: T;
  }
  
  export interface HostAnomalyDetection {
    connectionLostDetection: {
      enabled: boolean;
      onGracefulShutdowns: 'ALERT_ON_GRACEFUL_SHUTDOWN' | 'DONT_ALERT_ON_GRACEFUL_SHUTDOWN';
    };
    highCpuSaturationDetection: DetectionSetting<CustomThresholdsCPU>;
    highSystemLoadDetection: DetectionSetting;
    highMemoryDetection: DetectionSetting<CustomThresholdsMemory>;
    highGcActivityDetection: DetectionSetting<CustomThresholdsGC>;
    outOfMemoryDetection: DetectionSetting<CustomThresholdsGeneral>;
    outOfThreadsDetection: DetectionSetting<CustomThresholdsGeneral>;
  }
  
  export interface NetworkAnomalyDetection {
    networkDroppedPacketsDetection: DetectionSetting;
    networkErrorsDetection: DetectionSetting;
    highNetworkDetection: DetectionSetting;
    networkTcpProblemsDetection: DetectionSetting;
    networkHighRetransmissionDetection: DetectionSetting;
  }
  
  export interface AnomalyDetectionResponseItem {
    origin: string;
    value: {
      host: HostAnomalyDetection;
      network: NetworkAnomalyDetection;
    };
  }
  
  export interface AnomalyDetectionResponse {
    items: AnomalyDetectionResponseItem[];
    totalCount: number;
    pageSize: number;
  }
  