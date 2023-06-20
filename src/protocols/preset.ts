import type { ContentProtocol, CreatableProtocol, IDProtocol, TitleProtocol } from "./base"

export type PresetProtocol<T> = IDProtocol & TitleProtocol & CreatableProtocol & ContentProtocol<T>
