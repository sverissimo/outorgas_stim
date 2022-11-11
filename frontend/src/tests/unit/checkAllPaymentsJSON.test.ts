import { PaymentService } from "../../services/PaymentService"
import allPayments from "../../../../data/allPayments.json"

test('Test allPayments.json file', () => {
    const { count } = PaymentService.countGuiasPerPayment(allPayments.map(payment => payment.pagamentos))
    console.log('Número de guias: ', count)
    expect(count).toEqual(12337)
})
export { }