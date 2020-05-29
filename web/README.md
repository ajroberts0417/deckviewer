### Apollo schema download & codegen:
`apollo client:download-schema ./schema.json --endpoint=http://localhost:8000/graphql`

`apollo client:codegen --target=typescript --localSchemaFile=schema.json --outputFlat src/globalTypes.ts`

