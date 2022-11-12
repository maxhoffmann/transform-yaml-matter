#!/usr/bin/env node
import path from "path";
import { globby } from "globby";
import yamlMarkdownToHtml from "../index.js";

const args = process.argv.slice(2);
const renderFolder = path.resolve(process.cwd(), args[2] || "render");

const params = {
  contentFolder: args[0] || "content",
  publicFolder: args[1] || "public",
  renderFile: require(path.join(renderFolder, "render")),
  postRenderFile: false,
};

const markdownFiles = [
  path.join(params.contentFolder, "**/*.md"),
  path.join(params.contentFolder, "**/*.markdown"),
];

async function init() {
  params.files = await globby(markdownFiles, { onlyFiles: true });

  try {
    params.postRenderFile = require(path.join(renderFolder, "post-render"));
  } catch {}

  await yamlMarkdownToHtml(params);
}

init();
