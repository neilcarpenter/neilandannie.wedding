export default function replaceScriptTags(node) {
	const scriptTags = Array.prototype.slice.call(node.querySelectorAll('script'))

	if (scriptTags.length) {
		scriptTags.forEach(tag => {
			const scriptTag = document.createElement('script')
			scriptTag.src = tag.src
			document.body.appendChild(scriptTag)
		})
	}
}
