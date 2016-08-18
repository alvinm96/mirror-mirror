export interface NluResponse {
  id;
  timestamps;
  result: {
    resolvedQuery;
    parameters;
  };
  status: {
    code;
  }
}