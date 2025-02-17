import { Test, TestingModule } from '@nestjs/testing'
import { MemberService } from './user.service'

describe('MemberService', () => {
  let service: MemberService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberService],
    }).compile()

    service = module.get<MemberService>(MemberService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
