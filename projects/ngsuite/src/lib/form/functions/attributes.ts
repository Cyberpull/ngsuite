
export function requireStringAttribute(value: unknown): string {
  if (typeof(value) !== 'string') throw new Error('string value is required');
  return value;
}

export function stringAttribute(value: unknown): string {
  if (value) switch (typeof (value)) {
    case 'string': return value;
    case 'boolean': return JSON.stringify(value);
    
    case 'object':
    case 'bigint':
    case 'number':
    case 'symbol': return value.toString();
  }

  return '';
}
