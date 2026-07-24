---
name: review
description: Reviews code pending commit — bugs, security issues, and compliance with CLAUDE.md conventions — before pushing it.
---

# /review

Reviews changes that haven't been pushed to the remote repository yet.

## When it's invoked

Before every `git push`, or when the user explicitly types `/review`.

## What it does

1. Identifies the files modified since the last commit (`git status`, `git diff`).
2. Looks for potential bugs and security issues (injection, XSS, hardcoded secrets).
3. Checks that the code follows the conventions defined in `CLAUDE.md`.
4. Returns a prioritized list of findings — or explicitly confirms there are no issues.

## Expected output

A short summary: what's good, what needs fixing before committing, and why.
