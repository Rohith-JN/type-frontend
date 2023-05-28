import type { CodegenConfig } from "@graphql-codegen/cli";
import { __prod__ } from "./utils/constants";

const config: CodegenConfig = {
    overwrite: true,
    schema: __prod__
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : "http://localhost:4000/graphql",
    documents: "graphql/**/*.graphql",
    generates: {
        "generated/": {
            preset: "client",
            plugins: ["typescript", "typescript-operations", "typescript-urql"],
        },
    },
};

export default config;
