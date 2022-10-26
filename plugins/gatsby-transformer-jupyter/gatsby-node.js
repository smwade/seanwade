const yaml = require(`js-yaml`)
const _ = require(`lodash`)
const { spawn } = require('node:child_process');


let nbconvert = async (nbPath) => {
  const child = spawn('jupyter', ['nbconvert', nbPath,'--to', 'html', '--stdout', '--template', 'basic', '--TagRemovePreprocessor.enabled=True', '--TagRemovePreprocessor.remove_cell_tags', 'metadata'])
  let data = ""
  for await (const chunk of child.stdout) {
    data += chunk
  }
  return data
}

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  function transformObject(obj, id, type, html) {
    const newNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      html: html,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    }
    createNode(newNode)
    createParentChildLink({ parent: node, child: newNode })
  }

  const { createNode, createParentChildLink } = actions

  if (node.ext !== `.ipynb`) return;

  const content = await loadNodeContent(node)

  let ipynb = await JSON.parse(content)
  try {
    const metadataCell = ipynb.cells.filter(x => x.metadata?.tags?.includes('metadata'))[0]
    const metadata = await yaml.load(metadataCell['source'].join(''))
    ipynb['metadata'] = {...ipynb['metadata'], ...metadata}
  } catch {
    console.log('Bad metadata');
  }

  const newObj = {
    ...ipynb,
    name: node.name,
    url: `/${node.name}/`,
    ext: node.ext,
  }

  const html = await nbconvert(node.absolutePath)
  transformObject(
    newObj,
    newObj.id ? newObj.id : createNodeId(`${node.id} >>> Jupyter`),
    _.upperFirst(_.camelCase(`Jupyter`)),
    html
  )
}

exports.onCreateNode = onCreateNode
