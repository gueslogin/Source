﻿using System;

namespace CustomMVCIdentity.Models
{
    class OptionFlag : Attribute
    {
        public string Name { get; private set; }

        public OptionFlag(string name)
        {
            Name = name;
        }
    }
}
