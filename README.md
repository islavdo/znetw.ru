# znetw.ru

Статический сайт публикуется средствами GitHub Pages непосредственно из корня ветки `main` — без GitHub Actions и без отдельной ветки `gh-pages`.

## Настройка GitHub Pages

1. Откройте **Settings → Pages** в репозитории.
2. В разделе **Build and deployment** выберите **Source → Deploy from a branch**.
3. Выберите ветку **main**, каталог **/(root)** и нажмите **Save**.
4. В поле **Custom domain** укажите `znetw.ru` и нажмите **Save**.
5. Дождитесь выпуска сертификата и включите **Enforce HTTPS**.

После этого каждый push в `main` автоматически обновляет сайт. Главная страница — корневой [`index.html`](index.html). Файл [`CNAME`](CNAME) закрепляет домен `znetw.ru`, а [`.nojekyll`](.nojekyll) отключает обработку Jekyll.

## DNS для znetw.ru

A-записи корневого домена (`@`):

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Опциональные AAAA-записи:

```text
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

Для `www` используйте CNAME-запись `www` → `islavdo.github.io`. Не используйте wildcard-записи (`*`). Для защиты от перехвата домена рекомендуется подтвердить его через **Profile settings → Pages** и сохранить выданную GitHub TXT-запись.

Проверка DNS в PowerShell:

```powershell
Resolve-DnsName znetw.ru -Type A
Resolve-DnsName www.znetw.ru -Type CNAME
```
