export default function mapByKey<T>(obj: T[], key: keyof T) {
    return obj.reduce((acc, curr) => {
        acc[curr[key] as string | number | symbol] = curr;
        return acc
      }, {} as { [k: string | number | symbol]: T });
}