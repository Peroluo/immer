const errors = {
	0: "Illegal state",
	1: "Immer drafts cannot have computed properties",
	2: "This object has been frozen and should not be mutated",
	3(data: any) {
		return (
			"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " +
			data
		)
	},
	4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
	5: "Immer forbids circular references",
	6: "The first or second argument to `produce` must be a function",
	7: "The third argument to `produce` must be a function or undefined",
	8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
	9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
	10: "The given draft is already finalized",
	11: "Object.defineProperty() cannot be used on an Immer draft",
	12: "Object.setPrototypeOf() cannot be used on an Immer draft",
	13: "Immer only supports deleting array indices",
	14: "Immer only supports setting array indices and the 'length' property",
	15(path: string) {
		return "Cannot apply patch, path doesn't resolve: " + path
	},
	16: 'Sets cannot have "replace" patches.',
	17(op: string) {
		return "Unsupported patch operation: " + op
	},
	18(plugin: string) {
		return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`
	},
	19(plugin: string) {
		return "plugin not loaded: " + plugin
	},
	20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available"
} as const

export function die(error: keyof typeof errors, ...args: any[]): never {
	if (__DEV__) {
		const e = errors[error]
		const msg = !e
			? "unknown error nr: " + error
			: typeof e === "function"
			? e.apply(null, args as any)
			: e
		throw new Error(`[Immer] ${msg}`)
	}
	throw new Error(
		`[Immer] minified error nr: ${error}${
			args.length ? " " + args.join(",") : ""
		}. Find the full error at: https://bit.ly/3cXEKWf`
	)
}
