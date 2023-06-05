import type { ContentProtocol, CreatableProtocol, IDProtocol, TitleProtocol } from "./misc"

export type PresetProtocol<T> = IDProtocol & TitleProtocol & CreatableProtocol & ContentProtocol<T>
