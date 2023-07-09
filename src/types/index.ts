import type { StrictOmit } from "ts-essentials";

import type { ChatData } from "@/bot/types";
import type { Model } from "@/zod";
import type { MessageID } from "@/zod/id";

export type TotalTokenUsed = {
    [model in Model]?: {
        promptTokens: number;
        completionTokens: number;
    };
};

export type ChatItem = StrictOmit<ChatData, "content"> & {
    messages: MessageID[];
};

export type ChatCompletionTask =
    | {
          type: "sending";
          messageID: MessageID;
          abort: () => void;
      }
    | {
          type: "replying";
          messageID: MessageID;
          abort: () => void;
      }
    | {
          type: "completed";
          messageID: MessageID;
      }
    | {
          type: "errored";
          messageID: MessageID;
          error: Error;
      };
