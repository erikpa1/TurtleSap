# Invoices — SAP CAP (Java) backend

A minimal [SAP Cloud Application Programming Model](https://cap.cloud.sap/) project
in **Java**, built for learning. It exposes an OData V4 service over an in-memory
H2 database that is auto-created and seeded from CSV on every start.

## Prerequisites (already installed on this machine)

| Tool        | Version | Notes |
|-------------|---------|-------|
| JDK         | 21      | `/opt/homebrew/opt/openjdk@21` |
| Maven       | 3.9     | `/opt/homebrew/bin/mvn` |
| @sap/cds-dk | 9.x     | npm global, prefix `~/.npm-global` |

These aren't on your default `PATH`, so export them first (or add to `~/.zshrc`):

```bash
export JAVA_HOME=/opt/homebrew/opt/openjdk@21
export PATH="$HOME/.npm-global/bin:/opt/homebrew/opt/openjdk@21/bin:/opt/homebrew/bin:$PATH"
```

## Run it

```bash
cd backend
./run.sh              # default port 8080
./run.sh 8081         # different port (e.g. if 8080 is taken)
```

`run.sh` exports the JDK 21 + Maven paths for you, so you don't need the
manual `export` step above. To run Maven directly instead:

```bash
mvn spring-boot:run                                   # default port 8080
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081   # if 8080 is taken
```

Then open these in a browser:

| URL | What it is |
|-----|-----------|
| http://localhost:8081/ | CAP index page (lists services) |
| http://localhost:8081/odata/v4/InvoiceService/ | Service document |
| http://localhost:8081/odata/v4/InvoiceService/$metadata | EDMX metadata |
| http://localhost:8081/odata/v4/InvoiceService/Invoices | All invoices |
| http://localhost:8081/odata/v4/InvoiceService/OpenInvoices | Read-only filtered view |
| http://localhost:8081/$fiori-preview | Auto-generated Fiori UI preview |
| http://localhost:8081/h2-console | Browse the in-memory DB |

### Handy OData queries

```
?$filter=status eq 'Open'
?$orderby=extendedPrice desc&$top=3
?$select=product,quantity&$count=true
```

## Project layout

```
backend/
├─ db/
│  ├─ schema.cds                 # data model: the Invoices entity
│  └─ data/*.csv                 # seed data (auto-loaded into H2)
├─ srv/
│  ├─ invoice-service.cds        # OData service definition
│  ├─ pom.xml                    # the Spring Boot / CAP runtime module
│  └─ src/main/java/...          # Java app + place for custom handlers
└─ pom.xml                       # parent build
```

## Where to go next (learning path)

1. **Add a field** to `db/schema.cds`, restart — the schema + API update automatically.
2. **Add a second entity** (e.g. `Shippers`) and an association from `Invoices`.
3. **Write a custom handler** in Java (e.g. validate `quantity > 0` on CREATE) — see
   https://cap.cloud.sap/docs/java/event-handlers.
4. **Wire your SAPUI5 `Frontend`** to consume `InvoiceService` over OData.

Docs: https://cap.cloud.sap/docs/java/
