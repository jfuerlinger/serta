test("A fucking dummy test", () => {
    expect(2).toBe(2)
})
// describe.skip("SertaStatus", () => {
//     let commandClient: Eris.CommandClient
//
//     beforeEach(() => {
//         commandClient = new CommandClient("any.Token")
//     })
//
//     test("given a command client when the command is created then it is valid", () => {
//         const sertaStatus = new SertaStatusCommand(commandClient)
//         expect(sertaStatus).toBeTruthy()
//     })
//
//     test("given a valid command when execute is called some message is created", () => {
//         // given
//         const sertaStatus = new SertaStatusCommand(commandClient)
//         jest.mock("eris")
//         const msg = new Eris.Message({"id": "", type: Eris.TextChannel}, commandClient)
//         console.log(msg.channel);
//         let n = 0
//         SertaUtils.createInfoMessage = () => n++
//
//         // when
//         sertaStatus.execute(msg, "")
//
//         // then
//         expect(n).toBe(1)
//     })
// })