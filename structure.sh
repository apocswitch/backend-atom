#!/bin/bash

mkdir -p \
  functions/src/api/tasks \
  functions/src/api/users \
  functions/src/config \
  functions/src/routes \
  functions/src/utils

touch functions/src/api/tasks/task.controller.ts
touch functions/src/api/tasks/task.service.ts
touch functions/src/api/tasks/task.repository.ts
touch functions/src/api/tasks/task.entity.ts
touch functions/src/api/tasks/task.schema.ts
touch functions/src/api/users/user.controller.ts
touch functions/src/api/users/user.service.ts
touch functions/src/api/users/user.repository.ts
touch functions/src/api/users/user.entity.ts
touch functions/src/api/users/user.schema.ts
touch functions/src/config/firebase.ts
touch functions/src/config/swagger.ts
touch functions/src/routes/index.ts
touch functions/src/utils/error-handler.ts
touch functions/src/utils/validate.ts
touch functions/src/index.ts