# Email to Send to TrueHost Support

**Subject:** Configure LiteSpeed Reverse Proxy for Node.js Application

---

Dear TrueHost Support Team,

I have a Node.js application running on my shared hosting account and need assistance configuring a reverse proxy.

**Current Setup:**
- cPanel Username: `gmooutas`
- Domain: `mwendomojawelfare.co.ke`
- Application: Node.js Express server running on `localhost:8000`
- Application Path: `/home/gmooutas/public_html/src/server.js`
- Database: SQLite at `/home/gmooutas/public_html/mwendo_moja.db`

**Requirement:**
I need all HTTPS requests to `https://mwendomojawelfare.co.ke` (port 443) to be reverse proxied to my Node.js application running on `localhost:8000`.

**Options I'm requesting:**

1. **Configure LiteSpeed Reverse Proxy** - Set up LiteSpeed to proxy port 443 → localhost:8000
2. **Enable Apache mod_proxy** - If available, enable Apache modules for reverse proxy
3. **Run Node.js on Port 80/443** - Help me configure Node.js to run directly on port 80 or 443

**Current Status:**
- ✅ Application is working at `http://mwendomojawelfare.co.ke:8000`
- ✅ Backend API is functional
- ✅ Database is connected
- ⚠️ Need standard HTTPS port (443) access

**What I've Tried:**
- Created `.htaccess` file with proxy rules (doesn't work with LiteSpeed)
- Verified Node.js is running and responding to requests

Please advise on the best approach for my shared hosting environment.

Thank you,
William Odwori

