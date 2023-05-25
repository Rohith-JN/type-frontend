import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.NEXT_PUBLIC_BACKEND_URL,
    documents: "graphql/**/*.graphql",
    generates: {
        "generated/": {
            preset: "client",
            plugins: ["typescript", "typescript-operations", "typescript-urql"],
        },
    },
};

export default config;
