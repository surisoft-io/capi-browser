# Capi Explorer


## If you have access to a running CAPI server you can use Capi Explorer from your local host.

Run `ng serve` and navigate to `http://localhost:4200/`. 

If you want to run Capi Explorer from a different host, just make sure you start CAPI-LB with the following environment property:
```
  manager:
    cors:
      host: http://your.capi.explorer.domain:4200
```