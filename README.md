# znetw.ru

Статический сайт, автоматически публикуемый на GitHub Pages из ветки `main`.

## Публикация

Workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) запускается при каждом push в `main`. Его также можно запустить вручную на вкладке **Actions → Deploy to GitHub Pages → Run workflow**.

Однократная настройка репозитория:

1. Открыть **Settings → Pages**.
2. В **Build and deployment → Source** выбрать **GitHub Actions**.
3. В поле **Custom domain** указать `znetw.ru` и нажать **Save**.
4. После выпуска сертификата включить **Enforce HTTPS**.

## DNS для znetw.ru

Для корневого домена (`@`) должны быть настроены A-записи GitHub Pages:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Опционально добавьте IPv6 AAAA-записи:

```text
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

Для `www` можно создать CNAME-запись `www` → `islavdo.github.io`. Не используйте wildcard-записи (`*`). GitHub рекомендует дополнительно подтвердить владение доменом в **Profile settings → Pages** и сохранить выданную TXT-запись.

Проверка DNS в PowerShell:

```powershell
Resolve-DnsName znetw.ru -Type A
Resolve-DnsName www.znetw.ru -Type CNAME
```

Изменения DNS могут распространяться до 24 часов.
