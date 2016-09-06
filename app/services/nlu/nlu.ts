export interface NluResponse {
  id;
  timestamps;
  result: {
    action;
    resolvedQuery;
    parameters;
    query;
  };
  status: {
    code;
  }
}