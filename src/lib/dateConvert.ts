
export function formatUtcToString(date: Date): string {
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth é 0-based
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}

export function formatStringToUtc(date: string): Date {
    const [dia, mes, ano] = date.split('/').map(Number);
    return new Date(Date.UTC(ano, mes - 1, dia)); // `mes - 1` pois o mês é 0-based
  }