import { toast } from "sonner"

export function toastSuccess({
  position = "top-right",
  text = "Sucesso!",
  duration = 4000,
}) {
  toast.success(text, {
    position,
    duration,
  })
}
export function toastError({
  position = "top-right",
  text = "Erro!",
  duration = 4000,
}) {
  toast.error(text, {
    position,
    duration,
  })
}
