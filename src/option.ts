export type Some<T> = { type: 'some', value: T }
export type None = { type: 'none' }
export type Option<T> = Some<T> | None;

export const some = <T>(value: T): Some<T> => ({ type: 'some', value });
export const none = (): None => ({ type: 'none' });

export const isSome = <T>(option: Option<T>): option is Some<T> => option.type === 'some';
export const isNone = <T>(option: Option<T>): option is None => option.type === 'none';

export const unwrap = <T>(option: Option<T>): T => {
    if (isSome(option)) {
        return option.value;
    }

    throw new Error('Tried to unwrap a None value');
};

export const unwrapOr = <T>(option: Option<T>, defaultValue: T): T => {
    if (isSome(option)) {
        return option.value;
    }

    return defaultValue;
};

export const unwrapOrElse = <T>(option: Option<T>, defaultValue: () => T): T => {
    if (isSome(option)) {
        return option.value;
    }

    return defaultValue();
};

