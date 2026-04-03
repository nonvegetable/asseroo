import { useState } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react"
import { IconCar } from "@tabler/icons-react"

export function Header({ items }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className="mx-4 rounded-3xl border border-softBlue-200/50 bg-white/80 shadow-pastel backdrop-blur-md sm:mx-6"
      classNames={{
        wrapper: "px-4 sm:px-8",
      }}
    >
      <NavbarBrand className="gap-3">
        <IconCar className="text-softBlue-500" size={28} />
        <p className="font-bold text-lg text-gray-700">Asseroo</p>
      </NavbarBrand>

      <NavbarMenuToggle aria-label="Toggle navigation" className="sm:hidden text-softBlue-500" />

      <NavbarContent justify="end" className="hidden sm:flex gap-4">
        {items.map((item, index) => (
          <NavbarItem key={index} className="mx-1">
            <Button className="button-pastel-outline text-sm rounded-full my-1" onClick={item.onClick}>
              {item.label}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="bg-white/90 backdrop-blur-md pt-3">
        {items.map((item, index) => (
          <NavbarMenuItem key={index} className="my-1">
            <Button
              fullWidth
              className="button-pastel-primary justify-start my-1"
              onClick={() => {
                item.onClick()
                setIsMenuOpen(false)
              }}
            >
              {item.label}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
