export interface ProblemEntity {
    entityId: {
      id: string;
      type: string;
    };
    name: string;
  }
  
  export interface ProblemFilter {
    id: string;
    name: string;
  }
  
  export interface EntityTag {
    context: string;
    key: string;
    value: string;
    stringRepresentation: string;
  }
  
  export interface Problem {
    problemId: string;
    displayId: string;
    title: string;
    impactLevel: string;
    severityLevel: string;
    status: string;
    affectedEntities: ProblemEntity[];
    impactedEntities: ProblemEntity[];
    rootCauseEntity: ProblemEntity | null;
    managementZones: string[];
    entityTags: EntityTag[];
    problemFilters: ProblemFilter[];
    startTime: number;
    endTime: number;
    "k8s.cluster.name"?: string[];
    "k8s.cluster.uid"?: string[];
  }
  
  export interface ProblemResponse {
    totalCount: number;
    pageSize: number;
    problems: Problem[];
    warnings: string[];
  }
  