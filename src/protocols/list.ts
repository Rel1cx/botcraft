import type { IDProtocol, TitleProtocol } from "./base";

export type ListProtocol<T extends IDProtocol = ListItemProtocol> = {
    items: T[];
};

export type ListItemProtocol = IDProtocol & TitleProtocol;

export type PinableListItemProtocol = ListItemProtocol & {
    pinned: boolean;
};
