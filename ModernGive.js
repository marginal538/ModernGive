class ModernGive {
  static PluginMeta = {
    Name: "ModernGive",
    Introduction: "This LiteLoaderBDS plugin replaces the default /give with a modern GUI /give",
    Version: [1, 0, 0],
    Other: {
      Git: "https://github.com/marginal538/ModernGive",
      License: "Apache License",
    },
  };

  static Init() {
    ll.registerPlugin(
      this.PluginMeta.Name,
      this.PluginMeta.Introduction,
      this.PluginMeta.Version,
      this.PluginMeta.Other
    );

    this.Main();
  }

  static Utils = {
    RemoveStandardGiveCommand: function () {
        let setup_tellCommand = NativeFunction.fromSymbol("?setup\@GiveCommand\@\@SAXAEAVCommandRegistry\@\@\@Z")

        var original = setup_tellCommand.hook(function (_registry) {
            return false;
        })
    }
  }

  static Main() {
    // Remove standard /give
    this.Utils.RemoveStandardGiveCommand();

    // Register our /give commands
    mc.regPlayerCmd("give", "commands.give.description", (pl) => {
        pl.tell("Give command")
    }, 1)
  }
}

ModernGive.Init();