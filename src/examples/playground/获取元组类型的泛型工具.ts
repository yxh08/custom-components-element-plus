const arr = ['user', 'admin', 'client'] as const

type TupleToUnion<T extends readonly any[]> = T[number]
type TupleToUnion2 = TupleToUnion<typeof arr>


type AnyArray = any[]

const arr2: AnyArray = [1, 2, 3] as const