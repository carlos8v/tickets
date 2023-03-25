declare global {
  type UseCase<Constructor, Req, Res> = (c: Constructor) => (r: Req) => Res
}

export {}
