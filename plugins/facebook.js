Asena.addCommand(
  {
    pattern: "fb ?(.*)",
    fromMe: true,
    desc: Lang.FB_DESC,
  },
  async (message, match) => {
    match = !message.reply_message ? match : message.reply_message.text
    if (match === "") return await message.sendMessage(Lang.NEED_REPLY)
    await message.sendMessage(Lang.DOWNLOADING)
    let links = await downVideo(match)
    if (links.length == 0) return await message.sendMessage(Lang.NOT_FOUND)
    let { buffer, size } = await getBuffer(links[0])
    if (size > 100)
      return await message.sendMessage(
        Lang.SIZE.format(size, links[0], links[1])
      )
    return await message.sendMessage(
      buffer,
      { quoted: message.quoted, caption: Lang.CAPTION.format(links[1] || "") },
      MessageType.video
    )
  }
)
