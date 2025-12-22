#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'otienowilli';
const REPO_NAME = 'mwendo-moja-welfare';
const BRANCH = 'main';

if (!GITHUB_TOKEN) {
  console.error('Error: GITHUB_TOKEN environment variable is not set');
  process.exit(1);
}

async function makeGitHubRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Node.js',
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '{}'));
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function pushChanges() {
  try {
    console.log('Checking if repository is initialized on GitHub...');
    try {
      const refPath = `/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${BRANCH}`;
      await makeGitHubRequest('GET', refPath);
      console.log('Repository already has commits, pushing new changes...');
    } catch (e) {
      if (e.message.includes('409')) {
        console.log('Repository is empty, initializing with first commit...');
        // Get the local commit SHA
        const localCommitSha = execSync('cat .git/refs/heads/main').toString().trim();
        console.log(`Local commit SHA: ${localCommitSha}`);

        // Get the commit object
        const commitObj = JSON.parse(execSync(`cat .git/objects/${localCommitSha.substring(0, 2)}/${localCommitSha.substring(2)}`).toString());
        console.log('Local commit found, pushing to GitHub...');
      } else {
        throw e;
      }
    }

    // Use git push with authentication
    console.log('Pushing to GitHub using git...');
    const remoteUrl = `https://${GITHUB_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git`;

    // Try to push using git command with environment variable
    try {
      const output = execSync(`GIT_ASKPASS=echo PASS=${GITHUB_TOKEN} git push origin ${BRANCH}`, {
        cwd: '/Users/blessedwilliams/MWENDO MOJA WELFARE',
        stdio: 'pipe',
        env: { ...process.env, GIT_ASKPASS: 'echo', PASS: GITHUB_TOKEN }
      }).toString();
      console.log(output);
    } catch (gitError) {
      console.log('Git push failed, trying alternative method...');
      // Alternative: use curl to push
      const output = execSync(`curl -X POST https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs -H "Authorization: token ${GITHUB_TOKEN}" -H "Content-Type: application/json" -d '{"ref":"refs/heads/${BRANCH}","sha":"$(cat .git/refs/heads/${BRANCH})"}'`, {
        cwd: '/Users/blessedwilliams/MWENDO MOJA WELFARE',
        stdio: 'pipe'
      }).toString();
      console.log(output);
    }

    console.log('✅ Changes pushed successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

pushChanges();

