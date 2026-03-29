(function(Scratch) {
    'use strict';

    class Extension {
        getInfo() {
            return {
                id: 'stickfightHelper',
                name: 'Helper',
                color1: '#1b1b1b',
                color2: '#4a4a4a',
                color3: '#f1f1f1',
                blocks: [{
                        opcode: 'setruntimesettings',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set runtime [MENU] to [BOOLEAN]',
                        arguments: {
                            MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'projectsettings',
                            },
                            BOOLEAN: {
                                type: Scratch.ArgumentType.BOOLEAN,
                            },
                        }

                    }, {
                        opcode: 'setframerate',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set frame rate [FPSVALUE]',
                        arguments: {
                            FPSVALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                            },
                        }
                    }, {
                        opcode: 'setstagesizewidth',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set stage Width [WIDTHVALUE]',
                        arguments: {
                            WIDTHVALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                            },
                        }

                    }, {
                        opcode: 'setstagesizeheight',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set stage Height [HEIGHTVALUE]',
                        arguments: {
                            HEIGHTVALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                            },
                        }

                    }, {
                        opcode: 'getstagewidth',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'stage Width',

                    }, {
                        opcode: 'getstageheight',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'stage Height',

                    }, {
                        opcode: 'mousedown',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'mousedown [MOUSEMENU]',
                        arguments: {
                            MOUSEMENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'mousebuttons',
                                acceptReporters: true
                            },
                        }
                    }

                ],

                menus: {
                    projectsettings: {
                        acceptReporters: true,
                        items: [{
                            text: "High Quality Pen",
                            value: 'high.quality.pen',
                        }, {
                            text: "Turbo Mode",
                            value: 'turbo.mode',
                        }, {
                            text: "Warp Timer",
                            value: 'warp.timer',
                        }, {
                            text: "Fencing",
                            value: 'fencing',
                        }, {
                            text: "---",
                            value: 'divider',
                        }, {
                            text: "Remove Misc Limits",
                            value: 'misc.limits',
                        }, {
                            text: "Disable Offscreen Rendering",
                            value: 'offscreen.rendering',
                        }, {
                            text: "Enable Dangerous Optimizations",
                            value: 'dangerous.optimizations',
                        }, {
                            text: "Disable Direction Clamping",
                            value: 'direction.clamp',
                        }, {
                            text: "Enable Interpolation",
                            value: 'interpolation',
                        }, ]
                    },
                    mousebuttons: {
                        items: [{
                                text: "Left",
                                value: '0',
                            }, {
                                text: "Middle",
                                value: '1',
                            }, {
                                text: "Right",
                                value: '2',
                            }, {
                                text: "Any",
                                value: 'any',
                            },

                        ]

                    }
                }
            }
        }

        setruntimesettings(args) {
            const booleanValue = args.BOOLEAN;
            const option = args.MENU;

            switch (option) {
                case 'high.quality.pen':
                    vm.renderer.setUseHighQualityRender(booleanValue);
                    break;
                case 'turbo.mode':
                    vm.setTurboMode(booleanValue);
                    break;
                case 'warp.timer':
                    vm.setCompilerOptions({
                        enabled: true,
                        warpTimer: booleanValue
                    });
                    break;
                case 'fencing':
                    vm.setRuntimeOptions({
                        fencing: booleanValue
                    });
                    break;
                case 'misc.limits':
                    vm.setRuntimeOptions({
                        miscLimits: !booleanValue
                    });
                    break;
                case 'offscreen.rendering':
                    vm.setRuntimeOptions({
                        disableOffscreenRendering: booleanValue
                    });
                    break;
                case 'dangerous.optimizations':
                    vm.setRuntimeOptions({
                        dangerousOptimizations: booleanValue
                    });
                    break;
                case 'direction.clamp':
                    vm.setRuntimeOptions({
                        disableDirectionClamping: booleanValue
                    });
                    break;
                case 'interpolation':
                    vm.runtime.setInterpolation(booleanValue);
                    break;
            }
        }
        setframerate(args) {
            vm.runtime.frameLoop.setFramerate(Math.min(Math.max(args.FPSVALUE, 0), 250));




        }

        setstagesizewidth(args) {
            vm.runtime.setStageSize(args.WIDTHVALUE, this.getstageheight())
        }
        setstagesizeheight(args) {
            vm.runtime.setStageSize(this.getstagewidth(), args.HEIGHTVALUE)
        }
        getstagewidth() {
            return vm.runtime.stageWidth

        }
        getstageheight() {
            return vm.runtime.stageHeight

        }

        mousedown(args, util) {
            const input = args.MOUSEMENU
            if (input === "any") {
                const mouse0 = util.ioQuery('mouse', 'getButtonIsDown', [0]);
                const mouse1 = util.ioQuery('mouse', 'getButtonIsDown', [1]);
                const mouse2 = util.ioQuery('mouse', 'getButtonIsDown', [2]);

                return mouse0 || mouse1 || mouse2;
            } else {
                return util.ioQuery('mouse', 'getButtonIsDown', [Number(input)]);
            }
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);
