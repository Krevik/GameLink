import { Column } from "primereact/column";
import { ReactElement } from "react";

type GenericColumnProps<T> = ColumnWithFieldProps<T> | ColumnWithBodyProps<T>;

interface ColumnWithFieldProps<T> {
    field: keyof T;
    body?: never;
    header: string;
}

interface ColumnWithBodyProps<T> {
    field?: never;
    body: (rowData: T) => ReactElement | string;
    header: string;
}

export const GenericColumn = <T,>(props: GenericColumnProps<T>) => {
    return <Column field={props.field as string} body={props.body} header={props.header} />;
};
