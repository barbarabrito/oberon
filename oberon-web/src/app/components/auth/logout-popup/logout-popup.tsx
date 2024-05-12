"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/popup"
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser-client"
import { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/navigation"

const LogoutPopup = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const supabase = createSupabaseBrowserClient()
  const { push } = useRouter()

  async function logout() {
    await supabase.auth.signOut({ scope: "local" })
    setOpen(false)
    push("auth/sign-in")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-main-background border-none">
        <DialogHeader>
          <DialogTitle className="mb-4 text-gray-300">
            Are you sure you want to log out?
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Click &quot;Cancel&quot; to return or &quot;Logout&quot; to proceed.
            <span className="mt-4 text-right flex items-center gap-2 justify-end">
              <button onClick={() => setOpen(false)} className="text-gray-400">
                Cancel
              </button>
              <button onClick={logout} className="text-red-400">
                Logout
              </button>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default LogoutPopup
