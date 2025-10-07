import { error } from "console";

export async function checkout(){
  try {
    const res = await fetch("/api/checkout/vertex80", {
        method: "POST"
    })
    const data = await res.json();
    window.location.href=data.url
  } catch(error) {
    console.error("Purchase Failed:", error)
  }  
}